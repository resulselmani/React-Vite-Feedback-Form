import { useMemo } from 'react';
import {
    AbsenceEntryExtensivePost,
    AbsenceEntryGet,
    AbsenceEntryPatch,
    EmployeeEntryStatusEnum,
} from 'types/backend_latest_restful';
import { bool, date, InferType, mixed, object, string } from 'yup';
import { matchDate, valueIsDate } from '../../util';
export const absenceEntrySchema = object({
    date: date().required().nullable().defined(),
    startTime: date().required().nullable().defined(),
    endTime: date()
        .required()
        .nullable()
        .defined()
        .test(
            'is-after-start',
            'End should be before start',
            (value, context) => {
                if (!valueIsDate(value)) {
                    return false;
                }
                if (!('startTime' in context.parent)) return false;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                const startTime: unknown = context.parent['startTime'];
                if (!valueIsDate(startTime)) {
                    return false;
                }
                return startTime < value;
            }
        ),
    absenceTypeId: string().required().nullable().defined(),
    comment: string().required(),
    partDay: bool().required().defined(),
    status: mixed<EmployeeEntryStatusEnum>()
        .oneOf(['To be checked', 'Checked', 'Approved', 'To be cleared'])
        .notRequired(),
    user_profile_id: string().nullable().notRequired(),
});
export type AbsenceEntryFields = InferType<typeof absenceEntrySchema>;
export const useUpdateAbsenceEntryPrefillData = (
    absenceEntry: AbsenceEntryGet | null
): AbsenceEntryFields =>
    useMemo<AbsenceEntryFields>(
        () => ({
            date: new Date(absenceEntry?.start ?? ''),
            startTime: new Date(absenceEntry?.start ?? ''),
            endTime: new Date(absenceEntry?.end ?? ''),
            absenceTypeId: absenceEntry?.absence_type_id ?? '',
            comment: absenceEntry?.comment ?? '',
            partDay: absenceEntry?.part_day_absence ?? false,
            status: absenceEntry?.status ?? 'To be checked',
            user_profile_id: String(absenceEntry?.user_profile_id) ?? '',
        }),
        [absenceEntry]
    );
export const toAbsenceEntryPost = (
    fields: AbsenceEntryFields
): AbsenceEntryExtensivePost => {
    let start: Date = fields.startTime ?? new Date();
    let end: Date = fields.endTime ?? new Date();
    const date: Date = fields.date ?? new Date();
    if (fields.partDay) {
        start = matchDate(start, date);
        end = matchDate(end, date);
    } else {
        start.setHours(0);
        start.setMinutes(0);
        end.setHours(23);
        end.setMinutes(59);
    }
    return {
        start: start.toISOString(),
        end: end.toISOString(),
        absence_type_id: fields.absenceTypeId ?? '',
        part_day_absence: fields.partDay,
        comment: fields.comment,
        user_profile_id: fields.user_profile_id ?? '',
    };
};
export const toAbsenceEntryPatch = (
    fields: AbsenceEntryFields
): AbsenceEntryPatch => {
    let start: Date = fields.startTime ?? new Date();
    let end: Date = fields.endTime ?? new Date();
    const date: Date = fields.date ?? new Date();
    if (fields.partDay) {
        start = matchDate(start, date);
        end = matchDate(end, date);
    } else {
        start.setHours(0);
        start.setMinutes(0);
        end.setHours(23);
        end.setMinutes(59);
    }
    return {
        start: start.toISOString(),
        end: end.toISOString(),
        absence_type_id: fields.absenceTypeId ?? '',
        part_day_absence: fields.partDay,
        status: fields?.status ?? 'To be checked',
        comment: fields.comment,
    };
};
// export const toAbsenceEntryPatch = (
//     fields: AbsenceEntryFields,
// ): AbsenceEntryPatch => toAbsenceEntryPost(fields);